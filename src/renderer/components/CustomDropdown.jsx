import React from 'react';
import Select, { components } from 'react-select';

export default function CustomDropdown({
    options,
    value,
    onChange,
    labelPrefix = '',
    defaultValue = null,
}) {
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: '#F1F3F5',
            borderRadius: '18px',
            fontWeight: 'bold',
            fontSize: '1.3rem',
            boxShadow: 'none',
            borderColor: '#F1F3F5',
            width: '100%',
            padding: '8px',
            '&:hover': {
                borderColor: '#F1F3F5',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#e9ecef' : 'white',
            color: 'black',
            fontSize: '1.3rem',
        })
    };

    const CustomSingleValue = ({ data, ...props }) => (
        <components.SingleValue {...props}>
            {labelPrefix && `${labelPrefix} `}<strong>{data.label}</strong>
        </components.SingleValue>
    );

    return (
        <Select
            styles={customStyles}
            options={options}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            components={{ SingleValue: CustomSingleValue }}
        />
    );
}
