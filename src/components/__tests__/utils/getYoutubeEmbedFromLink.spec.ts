import { getYoutubeEmbedFromLink } from "@/utils/getYoutubeEmbedFromLink";
import { expect, it, describe } from "vitest";

describe("Deve testar a implementação da função focusAllFormInputs", () => {
  it("Deve retornar um link de embed do YouTube correto a partir de um link de vídeo válido", () => {
    const link = "https://www.youtube.com/watch?v=12345";
    const expected = "https://www.youtube.com/embed/12345";

    expect(getYoutubeEmbedFromLink(link)).toEqual(expected);
  });

  it("Deve retornar um link de embed do YouTube correto a partir de um link curto do YouTube", () => {
    const link = "https://youtu.be/12345";
    const expected = "https://www.youtube.com/embed/12345";

    expect(getYoutubeEmbedFromLink(link)).toEqual(expected);
  });

  it("Deve retornar uma string vazia para um link inválido", () => {
    const link = "https://example.com/invalid";

    expect(getYoutubeEmbedFromLink(link)).toEqual("");
  });
});
