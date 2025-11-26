import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
  ];

  const footerLinks = [
      { title: 'About Us', href: '/about' },
      { title: 'Programs', href: '/programs' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-10 w-10 text-primary" />
                <span className="font-bold text-2xl font-headline">SEQHER</span>
            </Link>
            <p className="text-muted-foreground">Empowering communities and fostering sustainable development in alignment with global goals.</p>
          </div>
          
          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                  <li key={link.href}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {link.title}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-headline text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
               <li>
                    <Link href="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                        Donate
                    </Link>
                </li>
                <li>
                    <Link href="/appointment" className="text-muted-foreground hover:text-primary transition-colors">
                        Volunteer
                    </Link>
                </li>
            </ul>
          </div>

          <div>
             <h3 className="font-semibold font-headline text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
                {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                    <a href={social.href} aria-label={social.name}>
                        {social.icon}
                    </a>
                </Button>
                ))}
            </div>
            <p className="mt-4 text-muted-foreground text-sm">contact@seqher.org</p>
            <p className="text-muted-foreground text-sm">+1 (234) 567-890</p>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SEQHER. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
