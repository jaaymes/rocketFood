import { useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal/index';
import { Input } from '../Input/index';
import { FoodProps } from '../../utils/Food'
import { FormHandles } from '@unform/core';


interface ModalAddProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
}
interface CreateFoodData {
  name: string;
  image: string;
  price: number;
  description: string;
}


export const ModalAddFood: React.FC<ModalAddProps> = ({ isOpen, setIsOpen, handleAddFood }) => {

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: CreateFoodData) => {
      setIsOpen();
      handleAddFood(data)
    }, [handleAddFood, setIsOpen])


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
