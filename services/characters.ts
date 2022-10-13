import axios from "axios";

export const getAllCharactersByPage = (page: string, search: string) =>
  axios.get(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`
  );

export const getSingleCharacterById = (id: string) =>
  axios.get(`https://rickandmortyapi.com/api/character/${id}`);

export const getMultipleCharactersByIds = (ids: string) =>
  axios.get(`https://rickandmortyapi.com/api/character/${ids}`);
