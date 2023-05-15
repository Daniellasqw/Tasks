import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import today1 from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br'
import commonStyles from './commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTask from './AddTask';

export default function TaskList() {
  useEffect(() => {
    filterTasks()
  }, [task])

  const [visibleModal, setVisibleModal] = useState(false)
  const [task, setTask] = useState([
    {
      id: Math.random(),
      desc: "Comprar Livro de React Native",
      estimada: new Date(),
      doneAt: new Date(),

    },
    {
      id: Math.random(),
      desc: "Comprar Livro de PHP",
      estimada: new Date(),
      doneAt: null,

    }
  ])
  const [visibleTasks, setVisibleTasks] = useState([])
  const [showDoneTasks, setShowDoneTasks] = useState(true)

  const toggleFilter = () => {
    console.log(showDoneTasks)
    setShowDoneTasks(!showDoneTasks)
    // filterTasks()
    
  }

  const filterTasks = () => {
    let visibleTask = null
    if (showDoneTasks) {
      visibleTask = [...task]
    } else {
      visibleTask = visibleTasks.filter(task => task.doneAt === null)
    }
    setVisibleTasks(visibleTask)
  }

  const toggleTask = (id) => {
    const tasks = [...task]
    tasks.forEach(tasks => {
      if (tasks.id === id) {
        tasks.doneAt = tasks.doneAt ? null : new Date()
      }
    })
    setTask(tasks)
    filterTasks()
  }
  const addTask = newTask => {
    if (!newTask.desc) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }
    const tasks = [...task];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimada: newTask.date,
      doneAt: null,
    })
    setTask(tasks);
    setVisibleModal(false)
    filterTasks()


  }
  const deleteTask = id => {
    const tasks = task.filter(task => task.id !== id)
    setTask(tasks);
    filterTasks();
   

  }

  const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
  return (
    <View style={styles.container}>
      <ImageBackground source={today1} style={styles.background}>
        <View style={styles.titleBar}>
          <View style={styles.IconBar}>
            <TouchableOpacity onPress={toggleFilter}>
              <Icon name={showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
            </TouchableOpacity>

          </View>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>

      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <Task {...item} toggleTask={toggleTask} onDelete={deleteTask} />}
        />
      </View>
      <TouchableOpacity style={styles.addBotao} onPress={() => setVisibleModal(true)} activeOpacity={0.7}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
      <AddTask visible={visibleModal} onCancel={() => setVisibleModal(false)} onSave={addTask} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  background: {
    flex: 3
  },
  taskList: {
    flex: 7
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  IconBar: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: 'flex-end',
  },
  addBotao: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: "center",
    alignItems: 'center'
  }
})
