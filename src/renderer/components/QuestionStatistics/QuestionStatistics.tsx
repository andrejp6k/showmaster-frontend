import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import client from '../../../services/client';
import { useEffect, useState } from 'react';
import { QuestionStatisticDto, QuestionType } from '../../../types';
import Button from '../Button/Button';
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog';
import styles from './QuestionStatistics.scss';

function QuestionStatistics() {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [questionStatistics, setQuestionStatistics] = useState<QuestionStatisticDto[]>([]);

  useEffect(() => {
    const fetchQuestionStatistics = async () => {
      try {
        const response = await client.get('questions/statistics');
        setQuestionStatistics(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestionStatistics();
  }, []);

  const maxWidth = { maxWidth: '50px' };
  const isBuzzerType = (type: QuestionType) => type == QuestionType.TextBuzzer || type == QuestionType.PictureBuzzer;

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    const deleteQuestionStatistics = async () => {
      const response = await client.delete('questions/statistics');
      return response.status == 204;
    };

    const deleted = deleteQuestionStatistics();
    if (deleted) {
      setQuestionStatistics([]);
    }
    handleCloseConfirmationDialog();
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.deleteButton}>
          <Button onClick={handleOpenConfirmationDialog}>
            Delete all
          </Button>
        </div>
        <ConfirmationDialog open={isConfirmationDialogOpen} onClose={handleCloseConfirmationDialog} onConfirm={handleConfirmDelete} />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question Text</TableCell>
                <TableCell>Type</TableCell>
                <TableCell style={maxWidth}>Answered</TableCell>
                <TableCell style={maxWidth}>Skipped</TableCell>
                <TableCell style={maxWidth}>Scored By Answering Correctly</TableCell>
                <TableCell style={maxWidth}>Scored By Answering Wrong</TableCell>
                <TableCell style={maxWidth}>Both Teams Answered Correctly</TableCell>
                <TableCell style={maxWidth}>One Team Answered Correctly</TableCell>
                <TableCell style={maxWidth}>No One Answered Correctly</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionStatistics.map((row, index) => {
                const buzzerType = isBuzzerType(row.questionType);
                return (
                  <TableRow key={index}>
                    <TableCell>{row.questionText}</TableCell>
                    <TableCell>{QuestionType[row.questionType]}</TableCell>
                    <TableCell style={maxWidth}>{row.answeredTimes}</TableCell>
                    <TableCell style={maxWidth}>{row.skipped}</TableCell>
                    <TableCell style={maxWidth}>{buzzerType ? row.scoredByAnsweringCorrectly : '-'}</TableCell>
                    <TableCell style={maxWidth}>{buzzerType ? row.scoredByWrongOpponentAnswer : '-'}</TableCell>
                    <TableCell style={maxWidth}>{buzzerType ? '-' : row.bothTeamsAnsweredCorrectly}</TableCell>
                    <TableCell style={maxWidth}>{buzzerType ? '-' : row.oneTeamAnsweredCorrectly}</TableCell>
                    <TableCell style={maxWidth}>{buzzerType ? '-' : row.noOneAnsweredCorrectly}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default QuestionStatistics;
