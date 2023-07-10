import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


export default function FileListPage() {
    const navigation = useNavigation();
    const route = useRoute();
    const { page } = route.params;
    const [files, setFiles] = useState([]);
    const [refresh, setRefresh] = useState(false);

//REfresh whenever you back 
    useEffect(() => {
        if (refresh) {
            axios
                // .get(`https://localhost:4430/api/${page + 's'}?page=1`)
                .get(`https://localhost:4430/api/${page + "s"}?page=1`)
                .then(response => {
                    if (Array.isArray(response.data['hydra:member'])) {
                        setFiles(response.data['hydra:member']);
                    } else {
                        console.error('Invalid API response: Expected an array');
                    }
                })
                .catch(error => {
                    console.error('Error fetching files:', error);
                });
            setRefresh(false);
        }
    }, [refresh,page]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRefresh(true);
        });

        return unsubscribe;
    }, []);


   






    const handleCreateFile = () => {
        // Perform the add operation to add a new file on the current page
        console.log(`Adding a new file on the ${page} page`);
        navigation.navigate(page, { action: "create" });

    };

    const handleReadFile = (id) => {

        console.log('fileid', id , )
        navigation.navigate(page, { fileId: id,action: 'read', });
    };

    const handleEditFile = (id) => {
        // Navigate to the desired page for editing
        navigation.navigate(page, { fileId: id, action: "edit" });
        console.log(`Editing file ${fileId} on the ${page} page`);
    };

    
    const handleDeleteFile = (file) => {
        const id=file.id
        const date = new Date(file.date).toLocaleDateString('en-GB')
        console.log("id=",file.id)
        // Delete the file from the first endpoint
        
        // Delete the file from the second endpoint
        const deleteFileEndpoint1 = `https://localhost:4430/api/${page}s/${id}`;
        const deleteFileEndpoint2 = `https://localhost:4430/api/${page}_tables/${id}`;
        
        // Use axios.all to make parallel requests
        axios.all([
        axios.delete(deleteFileEndpoint1, ),//{ params: { ip: id } })

        axios.delete(deleteFileEndpoint2, )
    ])
    .then(axios.spread((response1, response2) => {
                console.log(`File with ip=`+id+` deleted successfully from both endpoints`);
                // Update the files state to remove the deleted file
                setFiles(files => files.filter(file => file.id !== id));
                Toast.show({
                    type: 'info',
                    text1: `La fiche du patient du`+date+` a été bien supprimée`,
                    position: 'bottom',
                    visibilityTime: 3000,
                });
            }))
            .catch(error => {
                console.error('Error deleting file with ip='+id, error);
                console.error('Reponse d Error deleting file with ip='+id, error.response.data);
            });

    };



    return (
        <View style={styles.container}>
            {/* <Text>File List for {page}</Text> */}

            { files.map((file) => (
                <View key={file.id} style={styles.fileContainer}>
                    <Text style={styles.dateText}>fiche:{
                        new Date(file.date).toLocaleDateString('en-GB')}</Text>
                    <Button onPress={() => handleReadFile(file.ip)} title="Lire" style={[styles.button, styles.readButton]} />
                    <Button onPress={() => handleEditFile(file.ip)} title="Modifier" style={[styles.button, styles.editButton]} />
                    <Button onPress={() => handleDeleteFile(file)} title="Supprimer" style={[styles.button, styles.deleteButton]} />

                </View>
            ))}
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Button onPress={handleCreateFile} title="Ajouter une fiche" />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white"
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    dateText: {
        flex: 1,
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        marginRight: 10,
    },
    // Button-specific styles
    readButton: {
        backgroundColor: 'blue',
    },
    editButton: {
        backgroundColor: 'yellow',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});

