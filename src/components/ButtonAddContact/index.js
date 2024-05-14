import ButtonAdd from './styles'; // Supondo que o arquivo esteja no mesmo diretório
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

const ButtonAddContact = () => {
    const navigate = useNavigate(); // Use o hook useNavigate

    const handleClick = () => {
        navigate('/contacts/add-contact'); // Substitua 'sua-rota' pela rota que você deseja direcionar
    };

    return (
        <ButtonAdd onClick={handleClick}>+</ButtonAdd>
    );
};

export default ButtonAddContact;
