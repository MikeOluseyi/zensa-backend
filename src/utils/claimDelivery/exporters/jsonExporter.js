export async function exportJSON(dto) {

  const json = JSON.stringify(dto, null, 2);

  return {

    fileName: `${dto.claim.claimNumber}.json`,

    mimeType: "application/json",

    buffer: Buffer.from(json, "utf8")

  };

}