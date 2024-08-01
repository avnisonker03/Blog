import React, { useCallback, useEffect,useState } from "react";
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues,formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: '', // Initially empty, will be fetched if editing
            status: post?.status || 'active',
            contentFileId: post?.contentFileId || '',
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (!userData) {
            console.error("User data is not available");
            return;
        }

        try {
            // Upload content as a file
            const contentFileId = await appwriteService.uploadContentFile(data.content);
            if (!contentFileId) {
                throw new Error('Error uploading content file.');
            }

            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    contentFileId, // Use the file ID instead of content
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                        content: contentFileId, // Use the file ID instead of content
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-]/g, '') // Remove invalid characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .slice(0, 36); // Limit to 36 characters
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const fetchContent = async (fileId) => {
            const content = await appwriteService.getContentFromFile(fileId);
            setValue('content', content);
        };

        if (post && post.contentFileId) {
            fetchContent(post.contentFileId);
        }
    }, [post, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-2">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    autocomplete="title"
                    {...register("title", { required: true })}
                    error={errors.title}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    autocomplete="slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 text-xs md:text-lg"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post  ? "Featured image is required" : false })}
                    error={errors.image}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg h-80 w-100"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                    error={errors.status} 
                />
                <Button type="submit" bgColor={post ? "bg-green-600" : undefined} className="w-full hover:bg-green-400">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;


