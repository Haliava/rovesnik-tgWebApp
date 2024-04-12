import React, { useEffect, useRef } from "react";
import { Artist } from "../../shared/types";
import ArtistCard from "../artistCard";
import styles from './styles.module.scss';

type Props = {
    artists: Artist[],
}
const Lineup = ({ artists }: Props) => {
    console.log(artists);
    const lineupRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        const lineupEl = lineupRef.current;
        if (lineupEl) {
            const cardWidth = window.innerWidth >= 375 ? 150 : 135;
            const gapWidth = 20;

            const singleSetWidth = cardWidth * artists.length + gapWidth * (artists.length - 1);
            let animationFrameId: number;

            const scroll = () => {
                if (lineupEl.scrollLeft >= singleSetWidth) {
                    lineupEl.scrollLeft = 0;
                } else {
                    lineupEl.scrollLeft += 1;
                }
                animationFrameId = requestAnimationFrame(scroll);
            };

            animationFrameId = requestAnimationFrame(scroll);

            return () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            };
        }
    }, [artists]);

    return (
        <div className={styles.lineupContainer} ref={lineupRef}>
            <div className={styles.lineup}>
                {artists.map((artist) => (
                    <ArtistCard key={artist.artist_id} artist={artist} />
                ))}

            </div>
        </div>

    );
};

export default Lineup;
