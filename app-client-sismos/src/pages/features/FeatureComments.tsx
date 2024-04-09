import { Link, useParams } from "react-router-dom";
import { useFetchFeature } from "../../hooks/features/useFeatures";
import { Loader } from "../../components/Loader";
import { FormEvent, useState } from "react";
import { CommentRequestT, CommentT } from "../../types/FeatureT";
import { createCommentFeature } from "../../api/feature";
import BaseIcon from "../../components/BaseIcon";
import { mdiBackspace, mdiContentSave, mdiMinus, mdiPlus } from "@mdi/js";
import { EMPTYSTRING } from "../../utils/Constants";


export function FeatureComments() {
    const { id } = useParams();
    const { data, isLoading } = useFetchFeature(id);
    const [listComents, setListComments] = useState<any[]>([])
    const [showAllComments, setShowAllComments] = useState(false);
    const [commentError, setCommentError] = useState(EMPTYSTRING);


    if (isLoading) {
        return <Loader />;
    }



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const commentElement = (event.target as HTMLFormElement).elements.namedItem('comment');

        if (commentElement instanceof HTMLTextAreaElement) {
            const commentValue = commentElement.value.toString();
            if (commentValue !== EMPTYSTRING) {
                setCommentError(EMPTYSTRING)
                const coment: CommentT = {
                    body: commentValue
                }
                const request: CommentRequestT = {
                    comment: coment
                }
                if (id) {
                    const response = await createCommentFeature(Number(id), request)
                    if (response) {
                        setListComments(response)
                    }
                }
            } else {
                setCommentError('El comentario es requerido');
            }

        }

    }

    const commentsToDisplay = showAllComments ? listComents : listComents.slice(0, 5);

    return (
        <>

            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full max-w-lg rounded overflow-hidden shadow-lg border-2 bg-white">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl h-24 mb-2 flex items-center justify-center">
                            {data?.title}
                        </div>
                        <div className="h-60">
                            <p className="text-gray-700 text-base">
                                Magnitude: {data?.mag}
                                <br />
                                Place: {data?.place}
                                <br />
                                Tsunami: {true ? "Yes" : "No"}
                                <br />
                                Magnitude Type: {data?.magType}
                                <br />
                                Longitude: {data?.longitude}
                                <br />
                                Latitude: {data?.latitude ?? 0}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="w-full max-w-lg rounded overflow-hidden shadow-lg border-2 bg-white">
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-bold mb-4">Comments</h2>

                        <div>
                            <div className="mb-4">
                                {commentsToDisplay.map((item) => (
                                    <div key={item.id} className="bg-gray-100 p-2 rounded-md mb-2">
                                        <p className="text-gray-800">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                            {listComents.length > 5 && !showAllComments && (
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setShowAllComments(true)}
                                >
                                    <BaseIcon path={mdiPlus} className="mr-1" /> See more
                                </button>
                            )}
                            {showAllComments && (
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setShowAllComments(false)}
                                >
                                   <BaseIcon path={mdiMinus} className="mr-1" />  See less
                                </button>
                            )}

                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Add Comment:</label>
                                <textarea id="comment" name="comment" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></textarea>
                                {commentError && <div className="text-red-500 text-sm">{commentError}</div>}
                            </div>
                            <div className="flex flex-row items-center justify-end gap-4">
                                <Link to='/' className="bg-slate-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    <BaseIcon path={mdiBackspace} className="mr-1" /> Back
                                </Link>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    <BaseIcon path={mdiContentSave} className="mr-1" />   Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
