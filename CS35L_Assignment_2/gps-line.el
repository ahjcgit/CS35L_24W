;; gps-line.el

(defun gps-line ()
  "Display the current line number and total number of lines in the format of a/b"
  (interactive)
  (let ((n (line-number-at-pos))
	(total (num-lines (point-min) (point-max))))
    (message "Line %d/%d" n total)))


;;Provide
(provide `gps-line)


;;counting lines

(defun num-lines (start end)
  "Count the number of newline characters between the start and end points"
  (save-excursion
    (save-restriction
      (goto-char (point-min))
      (let ((count 0))
	(while (search-forward "\n" nil t)
	  (setq count (1+ count)))
	count))))
