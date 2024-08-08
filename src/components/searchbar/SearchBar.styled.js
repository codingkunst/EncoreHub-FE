// src/components/SearchBar/SearchBar.styled.js
import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 250px;
`;

export const Button = styled.button`
  background-color: rgb(138, 14, 196);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;
