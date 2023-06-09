import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import commonStyles from "../screens/commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import 'moment/locale/pt-br'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'


export default props => {

    const doneOnNot = props.doneAt !== null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimada

    const formatteDate = moment(date).locale("pt-br").format('ddd, D [de] MMMM');
    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={()=> props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }


    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }
    return (
        <GestureHandlerRootView>
            <Swipeable 
            renderRightActions={getRightContent} 
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={()=> props.onDelete && props.onDelete(props.id)}
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOnNot]}>{props.desc}</Text>
                        <Text style={styles.date}>{formatteDate}</Text>
                    </View>

                </View >
            </Swipeable>
        </GestureHandlerRootView>


    )
}

function getCheckView(doneAt) {
    if (doneAt !== null) {
        return (
            <TouchableOpacity style={styles.done} >
                <Icon name='check' size={20} color='#fff' />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.pending}>

            </TouchableOpacity>
        )
    }

}




const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor:"#fff"
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',

    },
    pending: {
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: 1,
        bordeColor: '#555'
    },
    done: {
        width: 25,
        height: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    right: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20
    },
    left:{
        backgroundColor: "red",
        flexDirection:'row',
        alignItems: "center",
        flex:1

    },
    excludeText:{
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin:10
    },
    excludeIcon:{
        marginLeft: 10,
    }

})