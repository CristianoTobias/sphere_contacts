import styled from 'styled-components';

const ButtonAdd = styled.button`
    position: absolute;
    top: 20px;
    right: 25px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: green;
    border: none;
    color: white;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    z-index: 3;
    &:focus {
        outline: none;
    }
    @media only screen and (max-width: 1024px) {
        bottom: 80px;
      }
`;

export default ButtonAdd;
