import { useState } from "react";
import type { FormEvent } from "react"
import type { UserSession } from "../types/types";

const INITIAL_AVATAR = "https://api.dicebear.com/9.x/dylan/svg?seed=Andrea&backgroundColor=29e051&hair=plain&mood=superHappy&skinColor=c26450";

const avatarsURL = [
    INITIAL_AVATAR,
    "https://api.dicebear.com/9.x/dylan/svg?seed=Brooklynn&mood=confused,happy,hopeful,neutral,superHappy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Alexander&backgroundColor=619eff&mood=happy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Aidan&backgroundColor=ffa6e6&mood=happy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Chase&backgroundColor=619eff&mood=confused,happy,hopeful,neutral,superHappy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Eden&backgroundColor=ffa6e6&mood=superHappy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Eliza&backgroundColor=619eff&mood=hopeful",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Caleb&backgroundColor=ffa6e6&hair=shaggy&mood=hopeful",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Robert&mood=confused,happy,hopeful,neutral,superHappy",
    "https://api.dicebear.com/9.x/dylan/svg?seed=Ryan&mood=confused,happy,hopeful,neutral,superHappy",
];

type UseSettingsFormOptions = {
    user: UserSession | null;
    setUser: React.Dispatch<React.SetStateAction<UserSession | null>>;
    navigateTo: (path: string) => void;
};

export default function useSettingsForm({ user, setUser, navigateTo }: UseSettingsFormOptions) {
    const [userAvatar, setUserAvatar] = useState(INITIAL_AVATAR);
    const [userName, setUserName] = useState("");

    const saveUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userName.trim() === "") return;

        setUser({ userName, userAvatar });
        navigateTo("/");
    };

    const updateUserAvatar = (avatar: string) => {
        setUserAvatar(avatar);
        setUser(prev => {
            if (!prev) return prev;
            return { ...prev, userAvatar: avatar };
        });
    };

    const updateUserName = (name: string) => {
        if (name.trim() === "") return;
        setUser(prev => {
            if (!prev) return prev;
            return { ...prev, userName: name };
        });
    };

    return {
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        avatarsURL,
        saveUser,
        updateUserAvatar,
        updateUserName,
    };
}
