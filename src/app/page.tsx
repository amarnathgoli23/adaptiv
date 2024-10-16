'use client';

import { useState, useEffect, useRef } from 'react';
import Notification from '../components/Notification';
import '../app/globals.scss';
import styles from '../app/styles/Home.module.scss';
import Dialog from '@/components/Dialog';
import { Work_Sans, Manrope } from 'next/font/google';

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
});
const work_Sans = Work_Sans({
    subsets: ['latin'],
    display: 'swap',
});


const videoData = [
    {
        title: 'Adopt AI in Daily Lives',
        thumbnail: '/images/ai.png',
        videoUrl: 'https://www.youtube.com/embed/V97gg-WWBSg', // Embed URL for "Adopt for AI in daily lives"
    },
    {
        title: 'Adopt for Climate Change',
        thumbnail: '/images/climate.png',
        videoUrl: 'https://www.youtube.com/embed/hnXEEPQ2AXY', // Embed URL for "Adopt for Climate Change"
    },
    {
        title: 'Adopt for Sustainability',
        thumbnail: 'images/sustainability.png',
        videoUrl: 'https://www.youtube.com/embed/6zrn4-FfbXw', // Working embed URL for "Sustainability Explained"
    },
];

export default function IndexPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null); // Allow null
    const [activeThumbnail, setActiveThumbnail] = useState<number | null>(null);
    const [notification, setNotification] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoverdIndex, setHoverdIndex] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const showVideo = (index: number, videoUrl: string) => {
        // If the same video is clicked, close it (toggle)
        if (activeThumbnail === index) {
            setActiveVideo(null);  // Close the active video
            setActiveThumbnail(null);  // Deselect the thumbnail
        } else {
            // Open the clicked video
            setActiveVideo(videoUrl);
            setActiveThumbnail(index);
        }
        setIsDialogOpen(true);
    };

    // Handle clicks outside the video thumbnails
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveVideo(null);
                setActiveThumbnail(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [containerRef]);

    const handleEmailSubmit = (event: any) => {
        event.preventDefault();
        const emailInput = event.currentTarget.email.value;
        if (emailInput) {
            setNotification('Thank you for signing up!');
            event.currentTarget.reset();
        } else {
            setNotification('Please enter a valid email.');
        }
        setTimeout(() => setNotification(''), 3000);
    };



    return (
        <div className={styles.container} ref={containerRef}>
            <header className={styles.header}>
                <img src={'/images/Logo.png'} alt='Adaptive.Me' className={styles.logo} />
                <img src={'/images/Globe.png'} alt='Globe' className={styles.globeIcon} />
            </header>

            <main className={styles.main}>
                <p className={styles.title} ><span className={work_Sans.className}>Adapt for the world we live in</span></p>
                <p className={styles.description}>
                    <span className={manrope.className}>Take action to adapt to the world's most pressing challenges. Start by choosing a theme</span>
                </p>
                <div className={styles.videoGrid}>
                    {videoData.map((video, index) => (
                        <div
                            key={index}
                            className={`${styles.videoThumbnail} ${activeThumbnail === index ? styles.active : ''}`}
                            onMouseEnter={() => setHoverdIndex(index)}
                            onMouseLeave={() => setHoverdIndex(5)}
                            onClick={() => showVideo(index, video.videoUrl)}
                        >
                            {
                                hoverdIndex === index ? (
                                    <div className={styles.Hover} style={{ backgroundImage: `url(${video.thumbnail})` }}>
                                        <img src={'/images/play.png'} alt={video.title} className={styles.play} />
                                    </div>
                                ) : (
                                    <img src={video.thumbnail} alt={video.title} className={styles.thumbnailImage} />
                                )
                            }
                            <i className={`fas fa-play-circle ${styles.playIcon}`}></i>
                            <p className={styles.videoTitle}>{video.title}</p>
                        </div>
                    ))}
                </div>
                <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Welcome Dialog">
                    <iframe
                        width={"100%"}
                        height={"400px"}
                        src={activeVideo || ''}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Dialog>
                <p className={styles.signupText}>Signup to join a growing community of People who are Adaptiv</p>
                <p className={styles.signupTitle}> Signup for our beta</p>
                <form className={styles.signupForm} onSubmit={handleEmailSubmit}>
                    <div className={styles.inputContainer}>
                        <img src={'/images/Mail.png'} className={styles.inputIcon} />
                        <input
                            type="email"
                            name="email"
                            className={styles.emailInput}
                            placeholder="Input your email"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.signupButton}>Sign Up</button>
                </form>

                {notification && <Notification message={notification} />}
            </main>
            <footer className={styles.footer}>
                <p className={styles.botmLine}>© 2024 Brand, Inc • <a href='#'>Privacy</a> • <a href='#'>Terms</a> • <a href='#'>Sitemap</a></p>
                <div className={styles.socialIcons}>
                    <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                        <img src='/images/twitter.png' alt='twitter' />
                    </a>
                    <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                        <img src='/images/facebook.png' alt='facebook' />
                    </a>
                    <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
                        <img src='/images/linkdin.png' alt='linkedin' />
                    </a>
                    <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer'>
                        <img src='/images/youtube.png' alt='youtube' />
                    </a>
                </div>
            </footer>
        </div>
    );
}
