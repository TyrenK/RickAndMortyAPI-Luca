import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api'; 

export default function CharacterListScreen ({ navigate }) {

    const [personagens, setPersonagens] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const BuscandoPersonagens = async () => {
            try{
                const response = await api.get("/character");
                setPersonagens(response.data.results);
                setCarregando(false);
            } catch (error) {
                console.error("Erro ao buscar personagens", error);
                setCarregando(false);
            }   
        };
        BuscandoPersonagens();
    }, []);

    if (carregando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ff99" />
                <Text style={{ marginTop: 10 }}>Carregando personagens...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={personagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate("CharacterDetail", { id: item.id })}>
                        <Image source={{ uri: item.image }} style={styles.avatar}/>
                        <View>
                            <Text style={styles.nome}>{item.name}</Text>
                            <Text style={styles.info}>
                                {item.status} — {item.species}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#111"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#222",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    nome: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    info: {
        color: "#aaa",
    }
});