#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include <string.h>
#include "options.h"


ProgramOptions parse_options(int argc, char *argv[]){
    ProgramOptions options;

    //Initializing default cases
    options.input_mode = RDRAND; //Default case
    options.output_mode = STDIO; //Default case
    options.valid = 0;
    options.filedir = NULL;
    options.blocksize = 0;
    options.nbytes = 0;

    int opt;
    while ((opt = getopt(argc, argv, "i:o:")) != -1) {
        switch (opt) {
        case 'i':
            if (strcmp(optarg, "rdrand") == 0){
                options.input_mode = RDRAND;
            } else if (strcmp(optarg, "lrand48_r") == 0)
            options.input_mode = LRAND48;
            else{
                options.input_mode = FILE_PATH;
                options.filedir = optarg;
            }
            options.valid = 1;
            break;
        
        case 'o':
            if (strcmp(optarg, "stdio") == 0){
                options.output_mode = STDIO;
            } else {
                options.output_mode = BYTES;
                options.blocksize = atoi(optarg);
            }
            options.valid = 1;
            break;
        default: // '?' for unrecognized options and missing option arguments
            fprintf(stderr, "Usage: %s [-i input_source] [-o output_mode]\n", argv[0]);
            exit(EXIT_FAILURE);
        }
    }

    if (optind < argc){
        options.nbytes = atoll(argv[optind]);
    } else {
        fprintf(stderr, "Expected argument after option\n");
    }

    options.valid = 1;
    return options;
}
