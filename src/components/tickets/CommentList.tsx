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
            <div className="panel-block">
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
                    <input className="input" type="text" placeholder="Post comment" />
                </p>
            </div>
            <div className="panel-block">
                <button className="button is-light is-outlined is-dark is-fullwidth">Post</button>
            </div>
        </div>
    );
};

export default CommentList;
