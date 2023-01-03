export function getYoutubeEmbedFromLink(link: string) {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  if (match === null) return "";
  return `https://www.youtube.com/embed/${match[2]}`;
}
