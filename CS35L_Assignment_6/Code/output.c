#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h> // For write()
#include "output.h"


void write_output(const void *buffer, size_t size, const ProgramOptions *options) {
    if (strcmp(options->output_mode, "stdio") == 0) {
        // Using fwrite for stdio output
        fwrite(buffer, size, 1, stdout);
    } else {
        // Assume output_mode is a number representing the chunkSize
        int chunkSize = atoi(options->output_mode);
        if (chunkSize <= 0) {
            // Handle error or default case
            fprintf(stderr, "Invalid output chunk size: %s\n", options->output_mode);
            exit(EXIT_FAILURE);
        }

        //Reads bytes in by chunkSize, if it is smaller than chunkSize output just size
        const char *buffPtr = (const char *)buffer;
        while (size > 0) {
            ssize_t written = write(STDOUT_FILENO, buffPtr, (size < chunkSize) ? size : chunkSize);
            if (written < 0) {
                // Negative should not be possible
                perror("write failed");
                exit(EXIT_FAILURE);
            }
            buffPtr += written;
            size -= written;
        }
    }
}