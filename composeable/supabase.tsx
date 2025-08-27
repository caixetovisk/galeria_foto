import { createClient } from '@supabase/supabase-js';
// import { decode } from 'base64-arraybuffer';
import { decode } from 'base64-arraybuffer';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_API_KEY = process.env.SUPABASE_URL ?? '';

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

interface Arquivo {
    path: string,
    file: string,
    name: string,
    contentType: string,
    fileSize: Number
}

const BUCKET = "galeria";
const PATH_IMAGE = 'arquivos';
const PATH_PROFILE = 'profile';

const sendFileToSupabase = async ({ path, file, name, contentType, fileSize }: Arquivo): Promise<void> => {
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(name, decode(file), {
            contentType: contentType,
            upsert: true
        })
    if (error) {
        console.error('Supabase:', error.message);
    } else {
        console.log("Salvou!!!!")
    }
}

const removeFileFromSupabase = async ({ file, path }: Arquivo): Promise<void> => {
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .remove([`${PATH_PROFILE}/${path}`])
    if (error) {
        console.error(error.message);
    } else {
        console.log("Removeu!!!!!")
    }
}

const downloadFileFromSupabase = async ({ file, path }: Arquivo): Promise<void> => {
    
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .download(`${PATH_PROFILE}/${file}`)
    if (error) {
        console.error(error.message);
    } else {
        console.log("Baixou!!!!!")
    }
}

export { downloadFileFromSupabase, removeFileFromSupabase, sendFileToSupabase };

