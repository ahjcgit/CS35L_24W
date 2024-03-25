#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

/* Software implementation.  */

/* Input stream containing random bytes.  */
static FILE *urandstream = NULL;

/*Open file*/
void initfile (char* file)
{
    urandstream = fopen (file, "r");
    if (! urandstream) {
        fprintf (stderr, "Invalid file: %s\n", file);
        abort ();
    }
}

/* Initialize the software rand64 implementation.  */
void software_rand64_init (void)
{
  if (! urandstream)
    abort ();

  if (urandstream == NULL) fopen ("/dev/random", "r");
}

/* Return a random value, using software operations.  */
unsigned long long software_rand64 (void)
{ //When input option is lrand48_r
  unsigned long int x;
  static struct drand48_data buffer;
  
  lrand48_r(&buffer, &x);
  
  if (fread (&x, sizeof x, 1, urandstream) != 1)
    abort ();
  return x;
}

/* Finalize the software rand64 implementation.  */
void
software_rand64_fini (void)
{
  fclose (urandstream);
}

_Bool writebytes (unsigned long long x, int nbytes){
  do{
    if (putchar (x) < 0) return 0;
      x >>= CHAR_BIT;
      nbytes--;
    }
  while (0 < nbytes); return 1;
}
