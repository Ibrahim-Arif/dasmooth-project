export const filterBatonsData = (data, status, userUid = "") => {
  let filtered;

  if (status == "received") {
    filtered = data.filter(
      (e) => e["memberPostStatus"] == "received" && e["memberId"] == userUid
    );
    console.log(filtered, data);
  } else
    filtered = data.filter(
      (e) => e["authorPostStatus"] == status && e["authorId"] == userUid
    );
  return filtered;
};
