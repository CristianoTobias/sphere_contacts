import styled from 'styled-components';

const ButtonAdd = styled.button`
    position: absolute;
    bottom: 30px;
    left: 480px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: green;
    border: none;
    color: white;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

export default ButtonAdd;
