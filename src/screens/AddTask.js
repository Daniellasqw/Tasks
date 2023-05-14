import React, { useState } from "react";
import {
    Text, View, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity,
    TextInput, Platform
} from "react-native";
import commonStyles from "./commonStyles";
import DateTimePiker from "@react-native-community/datetimepicker"
import moment from 'moment'
const initialState = { desc: '', date: new Date(), showDatePiker: false };

const AddTask = props => {
    const [state, setState] = useState({ ...initialState });


    const save = ()=>{
        const newTask = {...state}
        if(props.onSave){
            props.onSave(newTask)
        }
    }

    const getDateTimePiker = () => {

        let datePiker = <DateTimePiker
            value={state.date}
            onChange={(_, date) => {
                const date1 = { ...state }
                date1.date = date
                date1.showDatePiker = false
                setState(date1);
            }}
            mode="date"
        />
        const dataString = moment(state.date).format('ddd, D [de] MMMM  [de] YYYY')
        if (Platform.OS === "android") {
            datePiker = (
                <View>
                    <TouchableOpacity onPress={()=>{
                        const state1 = { ...state}
                        state1.showDatePiker = true
                        setState(state1);
                    }}>
                        <Text style={styles.date}>
                            {dataString}
                        </Text>
                    </TouchableOpacity>
                    {state.showDatePiker && datePiker}
                </View>
            )
        }

        return datePiker
    }


    return (
        <Modal
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onCancel}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input}
                    placeholder="Informe a Descrição..."
                    onChangeText={desc => {
                        const desc1 = { ...state }
                        desc1.desc = desc
                        setState(desc1)
                    }}
                    value={state.desc}
                />
                {getDateTimePiker()}
                <View style={styles.botoes}>
                    <TouchableOpacity onPress={() => props.onCancel()}><Text style={styles.botao}>Cancelar</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.botao}>Salvar</Text></TouchableOpacity>

                </View>
            </View>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )

}
export default AddTask;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {

        backgroundColor: "#fff",

    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,

        height: 40,
        margin: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e3e3e3", borderRadius: 6
    },
    botoes: {
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    botao: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today

    },
    date:{
        fontFamily:commonStyles.fontFamily,
        fontSize:20,
        marginLeft:15
    }

});