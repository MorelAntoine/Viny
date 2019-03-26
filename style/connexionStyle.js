'use strict';

var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
    content: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: '10%',
        marginRight: '10%'
    },
    additionalMargin: {
        marginBottom: '8%'
    },
    title: {
        color: '#2c0e16',
        fontSize: 60,
        marginBottom: '27%'
    },
    item: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#2c0e16'
    },
    icon: {
        marginLeft: 10
    },
    button: {
        marginTop: 25
    },
    forgottenPasswordButton: {
        marginTop: 20,
        marginLeft: 70,
        marginRight: 70
    },
    forgottenPasswordText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#2c0e16'
    },
    header: {
        backgroundColor: '#fff5df',
    },
    headerText: {
        color: '#2c0e16'
    },
    footer: {
        backgroundColor: '#fff5df',
    },
    footerText: {
        color: '#2c0e16'
    }
});