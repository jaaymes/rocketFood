import { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal/index';
import {Input} from '../Input/index';
import { FoodProps } from '../../utils/Food'
import { FormHandles } from '@unform/core';

interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
  editingFood: FoodProps;
}
interface EditFood {
  name: string;
  price: number;
  image: string;
  description: string;
}

export const ModalEditFood: React.FC<ModalEditProps> = ( {isOpen, setIsOpen, handleUpdateFood, editingFood}) => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: EditFood) => {
      const { name, image, price, description } = data;
      handleUpdateFood({ name, image, price, description });
      setIsOpen();
    },
    [handleUpdateFood, setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

// class ModalEditFood extends Component {
//   constructor(props) {
//     super(props);

//     this.formRef = createRef()
//   }

//   handleSubmit = async (data) => {
//     const { setIsOpen, handleUpdateFood } = this.props;

//     handleUpdateFood(data);
//     setIsOpen();
//   };

//   render() {
//     const { isOpen, setIsOpen, editingFood } = this.props;

//     return (

//     );
//   }
// };

// export default ModalEditFood;
