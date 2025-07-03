import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { PLUGIN_ID } from '../pluginId';
import taskRequests from '../api/settings';
import { useFetchClient } from '@strapi/strapi/admin';

interface TinyEditorProps {
    onChange: (e: any) => void;
    name: string;
    value?: string;
    disabled?: boolean;
}

const TinyEditor = ({ onChange, name, value, disabled }: TinyEditorProps) => {
    const { get, post } = useFetchClient();

    const [pluginConfig, setPluginConfig] = useState<any>(null);
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getApiKey = async () => {
            const data = await taskRequests.getSettings();
            if (data) {
                return setApiKey(data.data.apiKey);
            }
        };
        const getPluginConfig = async () => {
            try {
                const editor = (await get(`/${PLUGIN_ID}/config/editor`)) as any;
                if (editor) {
                    setPluginConfig(editor);
                }
            } catch (error) {
                console.error('Error fetching plugin config:', error);
            }
        };
        getApiKey().then(() => {
            setLoading(false);
        });
        getPluginConfig();
    }, [get]);

    return !loading && pluginConfig?.data ? (
        <Editor
            apiKey={apiKey || ''}
            tinymceScriptSrc={pluginConfig?.data?.tinymceSrc || undefined}
            value={value}
            tagName={name}
            onEditorChange={(editorContent) => {
                onChange({ target: { name, value: editorContent } });
            }}
            init={{
                ...pluginConfig?.data?.editorConfig,
                images_upload_handler: async (blobInfo) => {
                    try {
                        const formData = new FormData();
                        formData.append('files', blobInfo.blob());

                        const response = await post('/upload', formData);
                        // useFetchClient returns the response data directly
                        if (response && Array.isArray(response) && response.length > 0) {
                            return response[0]?.url || '';
                        }
                        // Handle case where response is wrapped in data property
                        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
                            return response.data[0]?.url || '';
                        }
                        return '';
                    } catch (err) {
                        console.error('Upload error:', err);
                        return '';
                    }
                },
            }}
        />
    ) : (
        <></>
    );
};

export default TinyEditor;
