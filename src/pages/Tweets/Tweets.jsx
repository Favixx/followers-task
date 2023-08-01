import { useEffect, useState } from 'react';
import { getUsers, updateUser } from '../../service/api';
import { isSameUser, compareArr } from '../../service/compareArray';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { limit, lsKeys, totalItems } from '../../refs/constants';
import TweetsList from '../../components/TweetsList/TweetsList';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import Filter from '../../components/Filter/Filter';
import css from './Tweets.module.css'

const Tweets = () => {
    const [users, setUsers] = useLocalStorage(lsKeys.users, []);
    const [filter, setFilter] = useLocalStorage(lsKeys.filter, 'Show all');
    const [followings, setFollowings] = useLocalStorage(lsKeys.followings, []);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(totalItems);
    const [indexLimit, setIndexLimit] = useState(limit);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getUsers(page);

            setUsers((prevUsers) => {
                const newUser = data.map((user) => {
                    if (followings.includes(user.id)) {
                        return { ...user, isFollow: true };
                    }
                    return { ...user, isFollow: false };
                });

                const compareUsers = compareArr(prevUsers, data, isSameUser);

                return [...compareUsers, ...newUser];
            });

            setIsLoading(false);
        };

        fetchData();
    }, [page, followings, setUsers]);

    const handleFollow = async (userId) => {
        const updatedUsers = users.map((user) => {
            setIsLoading(true)
            if (user.id === userId) {
                const updatedUser = {
                    ...user,
                    isFollow: !user.isFollow,
                    followers: user.isFollow ? user.followers - 1 : user.followers + 1,
                };
                console.log(updatedUser);
                return updatedUser;
            } else {
                return user;
            }
        });

        try {
            await Promise.all([
                updateUser(userId, updatedUsers.find((user) => user.id === userId).followers),
                setUsers(updatedUsers)
            ]);
            setIsLoading(false)
        } catch (error) {
            console.log("Помилка при оновленні користувача на сервері:", error);
        }
        setFollowings((prevFollowings) => {
            if (prevFollowings.includes(userId)) {
                return prevFollowings.filter((id) => id !== userId);
            } else {
                return [...prevFollowings, userId];
            }
        });
    };


    const handleFilter = (value) => {
        setFilter(value);
        setPage(1);
        setIndexLimit(limit);

        let totalHitsCount = totalItems;
        if (value === 'Follow') totalHitsCount -= followings.length;
        if (value === 'Followings') totalHitsCount = followings.length;

        setTotalHits(totalHitsCount);
    };

    const handleChangePage = () => {
        setPage((prevPage) => prevPage + 1);
        setIndexLimit((prevIndexLimit) => prevIndexLimit + limit);
        setTotalHits((prevTotalHits) => prevTotalHits - limit);
    };

    const filteredUsers = users
        .filter((user) => {
            if (filter === 'Follow') return !user.isFollow;
            if (filter === 'Followings') return user.isFollow;
            return true;
        })
        .sort((a, b) => a.id - b.id)
        .slice(0, indexLimit);

    return (
        <main>
            <section className={css.tweets_section}>
                <div className={css.toolbar}>
                    <GoBackButton />
                    <Filter value={filter} onChange={handleFilter} />
                </div>
                <TweetsList users={filteredUsers} onClick={handleFollow} isLoading={isLoading} />
                {filteredUsers.length > 0 && totalHits > limit && (
                    <LoadMoreButton loading={isLoading} onClick={handleChangePage} />
                )}
            </section>
        </main>
    );
};

export default Tweets;
