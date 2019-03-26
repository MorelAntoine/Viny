'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#fff5df',
        color: '#2c0e16'
    },
    header: {
        backgroundColor: '#421421',
    },
    headerTitle: {
        width: 80
    },
    headerTitleText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#fff5df'
    },
    headerLanguageButton: {
        borderColor: '#fff5df',
        borderRadius: 80
    },
    headerLanguageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff5df'
    },
    content: {
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '3%'
    },
    scrollViewAdjustment: {
        paddingTop: '15%'
    },
    button: {
        backgroundColor: '#421421'
    },
    footerIcon: {
        color: '#421421',
        fontSize: 34
    },
    footerTab: {
        backgroundColor: '#fff5df',
    },
    footerTabSelected: {
        backgroundColor: '#421421',
    },
    footerIconSelected: {
        color: '#fff5df',
        fontSize: 34
    },
    card: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#ededed'
    },
    listItem: {
        width: '100%'
    },
    listText: {
        color: '#421421',
        fontSize: 18
    },
    listIcon: {
        color: '#421421',
        fontSize: 22,
        paddingRight: 26
    }
});