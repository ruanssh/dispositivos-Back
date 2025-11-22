import admin from '../config/firebaseConfig';

// Interface que representa os dados principais de uma escola
export interface SchoolData {
    courseList?: CourseData[]; 
    createdAt: string;         
    id: string;                
}

// Interface que representa um horário de aula
export interface Time {
    dateTime: string;   
    dayOfWeek: string;  
}

// Interface da estrutura de uma turma (classe)
export interface ClassData {
    name: string;        
    times: Time[];       
    id?: string;        
}

// Interface que representa um aluno
interface Student {
    name: string;          
    birthdate: string;    
    registerId: string;    
    document: string;      
    status: 'active' | 'inactive'; 
}

// Interface dos dados de um curso
interface CourseData {
    name: string;             
    classList?: ClassData[];  
    students: Student[];      
    createdAt: string;        
    id?: string;              
}


const schoolDataRef = admin.database().ref('schoolData');


export default class SchoolDataModel {

    // Cria um novo registro de SchoolData
    static async createSchoolData(schoolDataData: SchoolData): Promise<void> {
        const newRef = schoolDataRef.push();              
        schoolDataData.createdAt = new Date().toISOString();
        schoolDataData.id = newRef.key;                     
        return newRef.set(schoolDataData);                  
    };

    // Lista todos os registros de SchoolData
    static async listSchoolDatas(): Promise<SchoolData[]> {
        const snapshot = await schoolDataRef.once('value');
        const schoolDatas: SchoolData[] = [];

        snapshot.forEach((childSnapshot) => {             
            const data = childSnapshot.val();              
            schoolDatas.push(data);                       
        });

        return schoolDatas;
    }

    // Busca um registro pelo ID
    static async getSchoolDataById(id: string): Promise<SchoolData | null> {
        const snapshot = await schoolDataRef.orderByChild('id').equalTo(id).once('value');

        if (snapshot.exists()) {                    
            const data = snapshot.val();           
            const id = Object.keys(data)[0];         
            return { ...data[id], id: id };         
        }

        return null;
    }

    // Atualiza um registro existente
    static async updateSchoolDataById(id: string, updatedData: Partial<SchoolData>): Promise<void> {
        const data = await SchoolDataModel.getSchoolDataById(id);

        if (!data) {
            throw new Error('Dado não encontrado');
        }

        // Atualiza somente os campos enviados em updatedData
        await schoolDataRef.child(data.id).update(updatedData);
    }

    // Remove um registro pelo ID
    static async deleteSchoolDataById(id: string): Promise<void> {
        const data = await SchoolDataModel.getSchoolDataById(id);

        if (!data) {
            throw new Error('Dado não encontrado');
        }
        
        await schoolDataRef.child(data.id).remove();
    }

}
