import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUserDetails, updateUsername } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';

export default function UserInfo(): React.ReactElement {
    const [user, setUser] = React.useState('');
    const { isLoading, error, data } = useQuery<any, Error>(['user'], () => getUserDetails(), {
        staleTime: 60 * 1000 * 60, // one hour
    });

    const queryClient = useQueryClient();
    const mutation = useMutation(updateUsername, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            toast.success('Username updated!');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleUpdateUsername = (username: string) => {
        const payload = { username: username }
        const currentUsername = data.data.username
        mutation.mutate({ currentUsername, payload });
    };

    return (
        <div className="container">
            {isLoading && <LoadingBar />}
            {error && <p>{error.message}</p>}
            {data && (
                <>
                    <h2 className="subtitle">
                        Your current username is <strong>{data.data.username}</strong>
                    </h2>

                    <div className="field has-addons">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="New username"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <a className="button is-primary" onClick={() => handleUpdateUsername(user)}>
                                Update
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
