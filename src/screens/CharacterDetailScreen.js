import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api'; 

export default function CharacterListScreen ({ route, navigation }) {

    const { id, borderColor } = route.params;
    const [personagem, setPersonagem] = useState(null);
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        const BuscandoDetalhes = async () => {
            try {
                const response = await api.get("/character/"+ id)
                setPersonagem(response.data);
                setCarregando(false);
            } catch (error) {
                console.log("Erro ao buscar detalhes do personagem: ", error);
                setCarregando = false;
            }
        }

        BuscandoDetalhes();
    }, []);

    if (carregando) {
        return (
            <View style={styles.carregandoContainer}>
                <ActivityIndicator size="large" color="#00ff99" />
                <Text style={{ marginTop: 10 }}>Carregando personagens...</Text>
            </View>
        );
    }

     return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitulo}>Character Profile</Text>
                <View style={{ width: 20 }}/>
            </View>
            <Image source={{ uri: personagem.image }} style={[styles.image, {borderColor: borderColor }]} />
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text style={styles.infoValue}>{personagem.status}</Text>

                <Text style={styles.infoLabel}>Espécie:</Text>
                <Text style={styles.infoValue}>{personagem.species}</Text>

                <Text style={styles.infoLabel}>Gênero:</Text>
                <Text style={styles.infoValue}>{personagem.gender}</Text>

                <Text style={styles.infoLabel}>Origem:</Text>
                <Text style={styles.infoValue}>{personagem.origin.name}</Text>

                <Text style={styles.infoLabel}>Localização:</Text>
                <Text style={styles.infoValue}>{personagem.location.name}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
    },
    carregandoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111"
    },
    header: {
        width: "100%",
        paddingTop: 50,
        paddingBottom: 20,
        marginBottom: 20,
        backgroundColor: "#0B1E2D",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    headerTitulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00FFAA"
    },
    backArrow: {
        fontSize: 30,
        color: "red",
        fontWeight: "bold"
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 5,
        marginBottom: 20
    },
    nome: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10
    },
    infoContainer: {
        width: "90%",
        backgroundColor: "#132A3A",
        padding: 20,
        borderRadius: 15,
        marginTop: 10
    },
    infoLabel: {
        color: "#00FFAA",
        fontSize: 18,
        fontWeight: "bold"
    },
    infoValue: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 10
    }

});
