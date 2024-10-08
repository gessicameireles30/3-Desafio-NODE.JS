export default async function dateResponse(
  release_date: string,
): Promise<string> {
  const payload = release_date.split('T');
  const date = payload[0];
  const time = payload[1];

  const arrayDate = date.split('-');
  const fixTimeResponse = time.slice(0, 8);

  const fixDateResponse = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;

  const response = fixDateResponse.concat(' ' + fixTimeResponse);

  return response;
}
