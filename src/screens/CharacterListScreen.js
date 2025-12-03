import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import api from '../services/api'; 

export default function CharacterListScreen ({ navigation }) {

    const [personagens, setPersonagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [pesquisa, setPesquisa] = useState('');

    const buscarPersonagem = async () => {
        try {
            setCarregando(true);
            const endpoint = pesquisa ? `/character/?name=${pesquisa}` : "/character";
            const response = await api.get(endpoint);
            setPersonagens(response.data.results);
            setCarregando(false);
        } catch (error) {
            console.log("Nenhum personagem encontrado.");
            setPersonagens([]); 
            setCarregando(false);
    }
    };

    useEffect(() => {
        const BuscandoPersonagens = async () => {
            try{
                const response = await api.get("/character");
                setPersonagens(response.data.results);
                setCarregando(false);
            } catch (error) {
                console.error("Erro ao buscar personagens: ", error);
                setCarregando(false);
            }   
        };
        BuscandoPersonagens();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        buscarPersonagem();
        }, 500);
        return () => clearTimeout(timeoutId);
        }, [pesquisa]);

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
                <Text style={styles.headerTitulo}>Rick & Morty Characters</Text>
                <View style={{ width: 20 }}/>
            </View>
            <TextInput
                style={styles.pesquisa}
                placeholder="Search character..."
                placeholderTextColor="#888"
                value={pesquisa}
                onChangeText={setPesquisa}
            />

            <FlatList
                data={personagens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        style={[styles.personagem, {borderColor: index % 2 === 0 ? "#00B5CC" : "#00FFAA", borderWidth: 3}]}
                        onPress={() => navigation.navigate("CharacterDetail", { id: item.id, borderColor: index % 2 === 0 ? "#00B5CC" : "#00FFAA" })}>
                        <Image source={{ uri: item.image }} style={styles.avatar}/>
                        <View>
                            <Text style={styles.nome}>{item.name}</Text>
                            <Text style={styles.info}>
                                {item.status} — {item.species}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
		ListEmptyComponent={
        		<Text style={{ color: "#fff", marginTop: 20, fontSize: 16, textAlign: "center" }}>
           		 	Nenhum personagem encontrado.
        		</Text>
    		}
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
    header: {
        width: "100%",
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#0B1E2D",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15
    },
    headerTitulo: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00FFAA"
    },
    carregandoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
    },
    pesquisa: {
        backgroundColor: "#222",
        color: "#fff",
        padding: 12,
        marginVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#00FFAA"
    },
    personagem: {
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