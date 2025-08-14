import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`, reqBody)
}

//login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

// Get all books (can limit with query param later)
export const getAllBooksApi = async () => {
  return await commonApi("GET", `${serverUrl}/books`);
};

// Get single book by ID
export const getBookByIdApi = async (id) => {
  return await commonApi("GET", `${serverUrl}/books/${id}`);
};

// Add review to a book
export const addReviewApi = async (bookId, reqBody, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await commonApi("POST", `${serverUrl}/books/${bookId}/reviews`, reqBody, headers);
};

// Add a new book → Private (requires token)
export const addBookApi = async (reqBody, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  return await commonApi("POST", `${serverUrl}/books`, reqBody, headers);
};