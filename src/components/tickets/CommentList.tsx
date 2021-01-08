import React from 'react';

// interfaces
import { Comment } from '../../types';

import { getLastUpdatedString } from '../utils';

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FunctionComponent<CommentListProps> = ({ comments }: CommentListProps): React.ReactElement => {
    const createCommentElement = (comment: Comment) => {
        return (
            <div className="m-4">
                <p className="text-gray-800 pt-4">{comment.text}</p>
                <p className="text-gray-600 text-sm">{`Submitted by ${comment.user}, ${getLastUpdatedString(
                    comment.created,
                )}`}</p>
            </div>
        );
    };

    return (
        <div className="shadow-md rounded p-4 bg-blue-100 divide-y divide-blue-800">
            <h1 className="text-blue-800 text-lg">Comments</h1>
            {comments.map((comment) => createCommentElement(comment))}
            <div className="flex flex-row">
                <input
                    type="text"
                    placeholder="Post comment..."
                    className="my-2 w-full text-sm bg-blue-50 text-grey-darkest rounded h-10 p-3 focus:outline-none"
                />
                <button className="bg-blue-200 hover:bg-blue-400 border border-blue-800 rounded-sm m-2 p-2 focus:outline-none">
                    Post
                </button>
            </div>
        </div>
    );
};

export default CommentList;
