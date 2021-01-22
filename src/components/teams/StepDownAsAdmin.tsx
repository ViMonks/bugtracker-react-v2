import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { stepDownAsTeamAdmin } from '../API/FirebaseAPI';

interface ParamTypes {
    teamSlug: string;
}

export default function StepDownAsAdmin() {
    const [isActive, setIsActive] = React.useState(false);
    const { teamSlug } = useParams<ParamTypes>();

    const queryClient = useQueryClient();

    const mutation = useMutation(stepDownAsTeamAdmin, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('You are no longer an administrator of this team.');
            setIsActive(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleStepDownAsAdmin = () => {
        mutation.mutate({ teamSlug });
    };

    return (
        <>
            <button className="button is-outlined is-danger" onClick={() => setIsActive(!isActive)}>Step down as team admin</button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">Are you sure you wish to step down as administrator?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger" onClick={handleStepDownAsAdmin}>
                                    Step down
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button is-info" onClick={() => setIsActive(!isActive)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setIsActive(!isActive)}
                ></button>
            </div>
        </>
    );
}
