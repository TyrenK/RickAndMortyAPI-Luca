import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api'; 

export default function CharacterListScreen ({ navigate }) {

    const [personagens, setPersonagens] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
    
        const BuscandoPersonagens = async () => {
            try{
                response = await api.get("/character");
                setPersonagens(response.data.results);
                setCarregando(false);
            } catch (error) {
                console.error("Erro ao buscar personagens", error);
                setCarregando(false);
            }   
        };

        BuscandoPersonagens();
    }, []);
}
