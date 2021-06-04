import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { FoodProps } from '../../utils/Food';



export function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [modalOpen, setOpenModal] = useState(false);
  const [editModalOpen, setEditOpenModal] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      try {
        const { data } = await api.get('/foods');

        setFoods(data)
      } catch (err) {
        console.log(err)
      }
    }
    loadFoods();
  }, [])

  async function handleUpdateFood(
    food: Omit<FoodProps, 'id' | 'available'>
  ): Promise<void> {
    const { id, available } = editingFood;
    if (id && available) {
      const foodUpdated = { id, ...food, available };
      const response = await api.put(`/foods/${id}`, foodUpdated);
      const allFoods = foods.map(currentFood => {
        if (currentFood.id === foodUpdated.id) {
          return response.data;
        }
        return currentFood;
      });
      setFoods(allFoods);
    }
  }


  function toggleModal(): void {
    setOpenModal(modalOpen => !modalOpen);
  }

  function toggleEditModal(): void {
    setEditOpenModal(editModalOpen => !editModalOpen);
  }

  async function handleAddFood(
    food: Omit<FoodProps, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newFood = { ...food, available: true };
      const response = await api.post('/foods', newFood);
      const foodsUpdated = [...foods, response.data];
      setFoods(foodsUpdated);
      setOpenModal(false)
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number):Promise<void> {
    await api.delete(`/foods/${id}`);
    const allFoods = foods.filter(food => food.id !== id);
    setFoods(allFoods);
  }

  async function handleEditFood(food: FoodProps) {
    setEditingFood(food)
    setEditOpenModal(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
