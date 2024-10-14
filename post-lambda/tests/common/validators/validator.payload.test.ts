import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { VALIDATION_MESSAGES } from "../../../app/common/messages/errors/validation.message";
import ValidatorPayload from "../../../app/common/validators/validator.payload";

interface CProps {
  key: string;
  value: string;
}

interface BProps {
  code: string;
  items: CProps[];
}

interface AProps {
  name: string;
  entity_b: BProps;
}

class ClassC {
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("value")),
  })
  key: string;

  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("value")),
  })
  value: string;

  constructor(params: CProps) {
    this.key = params.key;
    this.value = params.value;
  }
}

class ClassB {
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("code")),
  })
  code: string;

  @IsArray({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_ARRAY("items")),
  })
  @ValidateNested({ each: true })
  items: ClassC[];

  constructor(params: BProps) {
    this.code = params.code;
    this.items = [];
    params.items.forEach((item: CProps): void => {
      this.items.push(new ClassC(item));
    });
  }
}

class ClassA {
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("name")),
  })
  name: string;

  @ValidateNested({ each: true })
  entity_b: ClassB;

  constructor(params: AProps) {
    this.name = params.name;
    this.entity_b = new ClassB(params.entity_b);
  }
}

describe("AppLogger", () => {
  it("should validate the error at the first level, ClassA", async () => {
    const request = new ClassA({
      name: "",
      entity_b: {
        code: "1001",
        items: [
          {
            key: "uno",
            value: "nivel uno",
          },
        ] as CProps[],
      } as BProps,
    } as AProps);

    const error = await ValidatorPayload.validate(request);

    expect(error.hasError).toEqual(true);
    expect(error.bodyError).toEqual(VALIDATION_MESSAGES.IS_NOT_EMPTY("name"));
  });
  it("should validate the error at the third level, ClassC", async () => {
    const request = new ClassA({
      name: "demo",
      entity_b: {
        code: "1001",
        items: [
          {
            key: "uno",
            value: "",
          },
        ] as CProps[],
      } as BProps,
    } as AProps);

    const error = await ValidatorPayload.validate(request);

    expect(error.hasError).toEqual(true);
    expect(error.bodyError).toEqual(VALIDATION_MESSAGES.IS_NOT_EMPTY("value"));
  });
});
