import ButtonAdd from './styles';
import { useNavigate } from 'react-router-dom';

const ButtonAddContact = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/contacts/add-contact'); 
    };

    return (
        <ButtonAdd onClick={handleClick}>+</ButtonAdd>
    );
};

export default ButtonAddContact;
