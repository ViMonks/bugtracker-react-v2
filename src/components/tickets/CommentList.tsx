import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

// interfaces
import { Comment } from '../../types';
import { createComment } from '../API/FirebaseAPI';

import { getLastUpdatedString } from '../utils';

interface CommentListProps {
    comments: Comment[];
}

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
    ticketSlug: string;
}

const CommentList: React.FunctionComponent<CommentListProps> = ({ comments }: CommentListProps): React.ReactElement => {
    const { teamSlug, projectSlug, ticketSlug } = useParams<ParamTypes>();
    const [commentState, setCommentState] = React.useState('');

    const queryClient = useQueryClient();
    const mutation = useMutation(createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['ticketDetails', { teamSlug, projectSlug, ticketSlug }]);
            queryClient.invalidateQueries('projectDetails');
            queryClient.refetchQueries();            
            toast.success('Comment created!');
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleSubmit = (): void => {
        const comment = { text: commentState };
        mutation.mutate({ teamSlug, projectSlug, ticketSlug, comment });
        setCommentState('')
    };

    const createCommentElement = (comment: Comment) => {
        return (
            <div key={comment.created} className="panel-block">
                <div className="content">
                    <p>
                        {comment.text}
                        <br></br>
                        <small>
                            {comment.user}, {getLastUpdatedString(comment.created)}
                        </small>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="panel is-light">
            <p className="panel-heading">Comments</p>
            {comments.map((comment) => createCommentElement(comment))}
            <div className="panel-block">
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Post comment"
                        onChange={(e) => setCommentState(e.target.value)}
                        value={commentState}
                    />
                </p>
            </div>
            <div className="panel-block">
                <button className="button is-light is-outlined is-dark is-fullwidth" onClick={() => handleSubmit()}>
                    Post
                </button>
            </div>
        </div>
    );
};

export default CommentList;
