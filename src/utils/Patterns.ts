export class Patterns {
  public static readonly email: PatternType[] = [
    {
      type: "mask",
      mask: /^[^s@]+@[^s@]+.[^s@]+$/,
      message: "Please enter a valid email.",
    },
  ];

  public static readonly password: PatternType[] = [
    {
      type: "length",
      minLength: 4,
      maxLength: 60,
      message: "Your password must contain between 4 and 60 characters.",
    },
  ];
}

export interface PatternMask {
  mask: RegExp;
  message: string;
  type: "mask";
}

export interface PatternLength {
  type: "length";
  minLength: number;
  maxLength: number;
  message: string;
}

export interface PatternRequired {
  type: "required";
  required: boolean;
  message: string;
}

export type PatternType = PatternMask | PatternLength | PatternRequired;
