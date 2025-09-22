import Link from 'next/link';
import PhotoGallery from '@/components/PhotoGallery';
import LetsTalk from '@/components/LetsTalk';
import '../photo-gallery.css';

export const metadata = {
  title: 'Photos',
  description: 'A personal gallery showcasing Thom Griggs&apos; life beyond code — family moments, DIY projects, and creative pursuits.',
};

// Personal photos from thomgriggs.com home page gallery with enhanced tags
const photos = [
  { id: '1', src: '/images/family/IMG_4986.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Holiday', 'Together'], width: 1400, height: 1867 },
  { id: '2', src: '/images/family/IMG_6388.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Celebration', 'Joy'], width: 1400, height: 1867 },
  { id: '3', src: '/images/family/IMG_5023.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Portrait', 'Memory'], width: 1400, height: 1050 },
  { id: '4', src: '/images/family/IMG_2985.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Candid', 'Love'], width: 1400, height: 1867 },
  { id: '5', src: '/images/family/IMG_4966.jpeg', alt: 'Family memory', category: 'Family', title: 'Family Memory', tags: ['Family', 'Special Occasion', 'Happiness'], width: 1400, height: 1050 },
  { id: '6', src: '/images/family/IMG_4956.jpeg', alt: 'Family time', category: 'Family', title: 'Family Time', tags: ['Family', 'Quality Time', 'Bonding'], width: 1400, height: 1050 },
  { id: '7', src: '/images/family/IMG_3224.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Outdoor', 'Adventure'], width: 1400, height: 612 },
  { id: '8', src: '/images/family/IMG_2312.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Reunion', 'Togetherness'], width: 1400, height: 1867 },
  { id: '9', src: '/images/family/IMG_6339.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Formal', 'Portrait'], width: 1400, height: 1050 },
  { id: '10', src: '/images/family/IMG_3421.jpeg', alt: 'Family memory', category: 'Family', title: 'Family Memory', tags: ['Family', 'Milestone', 'Celebration'], width: 1400, height: 1867 },
  { id: '11', src: '/images/family/IMG_2159.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Candid', 'Natural'], width: 800, height: 1200 },
  { id: '12', src: '/images/family/IMG_2217.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Event', 'Together'], width: 800, height: 1200 },
  { id: '13', src: '/images/family/IMG_2121.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Smile', 'Joy'], width: 800, height: 1200 },
  { id: '14', src: '/images/family/IMG_1486.jpeg', alt: 'Family time', category: 'Family', title: 'Family Time', tags: ['Family', 'Relaxation', 'Peaceful'], width: 800, height: 1200 },
  { id: '15', src: '/images/family/IMG_1514.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Activity', 'Fun'], width: 1200, height: 900 },
  { id: '16', src: '/images/family/IMG_2112.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Group', 'Portrait'], width: 1200, height: 800 },
  { id: '17', src: '/images/family/IMG_1761.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Special Day', 'Memory'], width: 900, height: 1200 },
  { id: '18', src: '/images/family/IMG_1651.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Spontaneous', 'Candid'], width: 1200, height: 800 },
  { id: '19', src: '/images/family/IMG_1325.jpeg', alt: 'Family memory', category: 'Family', title: 'Family Memory', tags: ['Family', 'Tradition', 'Heritage'], width: 1200, height: 800 },
  { id: '20', src: '/images/family/IMG_0865.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Quiet Time', 'Intimate'], width: 900, height: 1200 },
  { id: '21', src: '/images/family/IMG_0677.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Pose', 'Formal'], width: 1200, height: 900 },
  { id: '22', src: '/images/family/IMG_0274.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Celebration', 'Festive'], width: 800, height: 1200 },
  { id: '23', src: '/images/family/63503405597.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Holiday', 'Special'], width: 800, height: 1200 },
  { id: '24', src: '/images/family/IMG_0486.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Reunion', 'Connection'], width: 800, height: 1200 },
  { id: '25', src: '/images/family/DE531413.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Portrait', 'Timeless'], width: 800, height: 1200 },
  { id: '26', src: '/images/family/67106646605.jpeg', alt: 'Family memory', category: 'Family', title: 'Family Memory', tags: ['Family', 'Milestone', 'Achievement'], width: 800, height: 1200 },
  { id: '27', src: '/images/family/761924FE.jpeg', alt: 'Family moment', category: 'Family', title: 'Family Moment', tags: ['Family', 'Spontaneous', 'Natural'], width: 800, height: 1200 },
  { id: '28', src: '/images/family/65827132969.jpeg', alt: 'Family gathering', category: 'Family', title: 'Family Gathering', tags: ['Family', 'Event', 'Togetherness'], width: 800, height: 1200 },
  { id: '29', src: '/images/family/57730964119.jpeg', alt: 'Family photo', category: 'Family', title: 'Family Photo', tags: ['Family', 'Smile', 'Happiness'], width: 800, height: 1200 },
  { id: '30', src: '/images/family/56372490234.jpeg', alt: 'Family memory', category: 'Family', title: 'Family Memory', tags: ['Family', 'Special Moment', 'Treasure'], width: 800, height: 1200 },
];

const categories = ['Family'];
const allTags = ['Family', 'Holiday', 'Together', 'Celebration', 'Joy', 'Portrait', 'Memory', 'Candid', 'Love', 'Special Occasion', 'Happiness', 'Quality Time', 'Bonding', 'Outdoor', 'Adventure', 'Reunion', 'Togetherness', 'Formal', 'Milestone', 'Natural', 'Event', 'Smile', 'Relaxation', 'Peaceful', 'Activity', 'Fun', 'Group', 'Special Day', 'Spontaneous', 'Tradition', 'Heritage', 'Quiet Time', 'Intimate', 'Pose', 'Festive', 'Special', 'Connection', 'Timeless', 'Achievement', 'Treasure'];


// Video content is now handled within the PhotoGallery component

export default function PhotosPage() {
  return (
    <main className="photos-page">
      {/* Header */}
      <section className="photos-header">
        <div className="photos-header-content">
          <h1 className="photos-title">Photos</h1>
          <p className="photos-subtitle">
            A glimpse into my life beyond code — family, projects, and creative pursuits
          </p>
        </div>

        {/* Back to Home */}
          <Link 
            href="/" 
          className="photos-back-link"
          >
            ← Back to Home
          </Link>
      </section>

      {/* Photos Content */}
      <section className="photos-content">
        {/* Introduction */}
        <div className="photos-intro">
          <h2 className="photos-intro-title">Why I Share Photos</h2>
          <p className="photos-intro-text">
            I believe in showing the human side of development work. The projects I build aren&apos;t just code — they&apos;re solutions to real problems, often inspired by my own life and experiences.
          </p>
          <p className="photos-intro-text">
            These photos give you a sense of who I am outside of work: a dad who loves building things, someone who values family time, and a developer who finds inspiration in the world around me.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="photos-gallery-section">
          <h2 className="photos-gallery-title">Photo Gallery</h2>
          <PhotoGallery photos={photos} categories={categories} tags={allTags} />
        </div>

        {/* Privacy Note - Reduced Prominence */}
        <div className="photos-privacy">
          <p className="photos-privacy-text">
            I&apos;m selective about what I share publicly. Family photos are kept private, and I respect everyone&apos;s privacy. 
            What you see here are moments I&apos;m comfortable sharing that give you a sense of who I am as a person.
          </p>
        </div>

        {/* Reusable Let's Talk Component */}
        <LetsTalk
          title="Let's Connect"
          description="I believe the best working relationships happen when you know the person behind the code. Ready to work together on something meaningful?"
          primaryButtonText="Start a Project"
          primaryButtonLink="/contact"
          secondaryButtonText="Learn More About Me"
          secondaryButtonLink="/about"
        />
      </section>
    </main>
  );
}
