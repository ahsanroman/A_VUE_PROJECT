export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://mainvueproject31august2024-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send request."
      );
      throw error;
    }

    console.log(responseData); //unique ID that was generated
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit("addRequests", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://mainvueproject31august2024-default-rtdb.firebaseio.com/requests/${coachId}.json?atuh=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch request."
      );
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
