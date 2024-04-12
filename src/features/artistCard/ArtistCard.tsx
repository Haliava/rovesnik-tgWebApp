import React from "react"
import { Artist } from "../../shared/types";
import { useQuery } from "@tanstack/react-query";
import { uploadImage } from "../../entities/event/api";
import Spinner from "../../compoments/Spinner";
import styles from './styles.module.scss';
import { useTheme } from "../../shared/ui/themeContext/ThemeContext";

type Props = {
    artist: Artist
}
const ArtistCard = ({ artist }: Props) => {
    const { description, img_path, name, artist_id } = artist;

    const { data, isLoading } = useQuery({
        queryKey: ['loadArtistImg', artist_id],
        queryFn: () => uploadImage(img_path),
    })

    const { theme } = useTheme();
    const artistInfoTheme = theme === 'dark' ? styles.darkArtistInfo : styles.lightArtistInfo;

    return (
      
    <>
      <div className={styles.artist}>
            {isLoading && <Spinner />}
            {!isLoading && <img src={URL.createObjectURL(data)} />}
            <div className={`${styles.artistInfo} ${artistInfoTheme}`}>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    </>
    )
};

export default ArtistCard;
