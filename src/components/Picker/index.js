import React from 'react';
import { ProgressViewIOSComponent } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

function Picker(){

    const placeholder = {
        label: 'Selecione uma moeda...',
        value: null,
        clor: '#999'
    }
    return(
        <RNPickerSelect placeholder = {placeholder}   items = {props.moedas}   onValueChange={( valor ) => props.onChange( valor )} />

    );
}